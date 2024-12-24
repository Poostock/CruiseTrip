import { RouteInterface } from "../../../../interfaces/IRoute";

const apiUrl = "http://localhost:3036";

// Helper function for handling fetch requests
const fetchData = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.status === 204 ? true : await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
};

// Fetch all routes
async function GetRoutes() {
    return await fetchData(`${apiUrl}/routes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
}

// Fetch a specific route by ID
async function GetRouteById(id: number | undefined) {
    if (id === undefined) return false;
    return await fetchData(`${apiUrl}/route/${id}`, { method: "GET" });
}

// Create a new route
async function CreateRoute(data: RouteInterface) {
    return await fetchData(`${apiUrl}/routes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

// Update an existing route
async function UpdateRoute(data: RouteInterface) {
    return await fetchData(`${apiUrl}/routes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

// Delete a specific route by ID
async function DeleteRouteByID(id: number | undefined) {
    if (id === undefined) return false;
    return await fetchData(`${apiUrl}/routes/${id}`, { method: "DELETE" });
}

export { GetRoutes, GetRouteById, CreateRoute, UpdateRoute, DeleteRouteByID };
