import { CruiseTripInterface } from "../../../interfaces/ICruiseTrip";

const apiUrl = "http://localhost:3036";

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

async function GetCruiseTrips() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/cruiseTrips`, requestOptions);
}

async function GetCruiseTripById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/cruiseTrips/${id}`, requestOptions);
}

async function CreateCruiseTrip(data: CruiseTripInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/cruiseTrips`, requestOptions);
}

async function UpdateCruiseTrip(data: CruiseTripInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/cruiseTrips`, requestOptions);
}

async function DeleteCruiseTripByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/cruiseTrips/${id}`, requestOptions);
}


export { GetCruiseTrips, GetCruiseTripById, CreateCruiseTrip, UpdateCruiseTrip, DeleteCruiseTripByID };
