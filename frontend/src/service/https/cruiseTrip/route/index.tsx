import { RoutesInterface } from "../../../../interfaces/IRoute";

const apiUrl = "http://localhost:3036";

// Helper function for handling fetch requests
const fetchData = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            return null;
        }

        return response.status === 204 ? null : await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
};

// Fetch all routes
async function GetRoutes() {
    try {
        return await fetchData(`${apiUrl}/routes`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching routes:", error);
        return null;
    }
}

// Fetch a specific route by ID
async function GetRouteById(id: number | undefined) {
    if (id === undefined) {
        console.error("Invalid ID: undefined");
        return null;
    }

    try {
        return await fetchData(`${apiUrl}/route/${id}`, { method: "GET" });
    } catch (error) {
        console.error(`Error fetching route with ID ${id}:`, error);
        return null;
    }
}

// Create a new route
async function CreateRoute(data: RoutesInterface) {
    try {
        return await fetchData(`${apiUrl}/routes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error("Error creating route:", error);
        return null;
    }
}

// Update an existing route
async function UpdateRoute(data: RoutesInterface) {
    try {
        return await fetchData(`${apiUrl}/routes`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error("Error updating route:", error);
        return null;
    }
}

// Delete a specific route by ID
async function DeleteRouteByID(id: number | undefined) {
    if (id === undefined) {
        console.error("Invalid ID: undefined");
        return null;
    }

    try {
        return await fetchData(`${apiUrl}/routes/${id}`, { method: "DELETE" });
    } catch (error) {
        console.error(`Error deleting route with ID ${id}:`, error);
        return null;
    }
}

export { GetRoutes, GetRouteById, CreateRoute, UpdateRoute, DeleteRouteByID };
