from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: list
    edges: list

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes, edges):
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Depth-First Search to detect cycles.
    """
    # Build adjacency list from edges
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target:
            if source in graph:
                graph[source].append(target)
            else:
                graph[source] = [target]
            # Ensure target node exists in graph even if it has no outgoing edges
            if target not in graph:
                graph[target] = []

    # Track visited nodes and nodes in current recursion stack
    visited = set()
    rec_stack = set()

    def has_cycle(node):
        """Helper function to detect cycle using DFS"""
        visited.add(node)
        rec_stack.add(node)

        # Check all neighbors
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                # Found a back edge (cycle)
                return True

        rec_stack.remove(node)
        return False

    # Check each node for cycles
    for node in graph:
        if node not in visited:
            if has_cycle(node):
                return False  # Has cycle, not a DAG

    return True  # No cycles found, is a DAG

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    """
    Parse the pipeline and return:
    - num_nodes: number of nodes in the pipeline
    - num_edges: number of edges in the pipeline
    - is_dag: whether the pipeline forms a Directed Acyclic Graph
    """
    nodes = data.nodes
    edges = data.edges

    num_nodes = len(nodes)
    num_edges = len(edges)
    dag_status = is_dag(nodes, edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status
    }
