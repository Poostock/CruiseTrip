import { BookActivityInterface } from "../../../interfaces/IBookActivity";

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

async function GetBookActivitys() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/bookactivitys`, requestOptions);
}

async function GetAllBookActivityByCustomerId(id: Number | undefined) {
	const requestOptions = {
		method: "GET",
	};

	let res = await fetch(`${apiUrl}/bookActivity/byCustomerId/${id}`, requestOptions)
		.then((response) => response.json())
		.then((res) => {
			if (res.data) {
				return res.data;
			} else {
				return false;
			}
		});

	return res;
}

async function GetBookActivityById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/bookactivity/${id}`, requestOptions);
}

async function CreateBookActivity(data: BookActivityInterface) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/bookactivitys`, requestOptions)
		.then((response) => response.json())
		.then((res) => {
			if (res.data) {
				return { status: true, message: res.data };
			} else {
				return { status: false, message: res.error };
			}
		});

	return res;
}

async function UpdateBookActivity(data: BookActivityInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${apiUrl}/bookactivitys`, requestOptions);

        // ตรวจสอบสถานะ HTTP
        if (!response.ok) {
            const errorData = await response.json();
            return {
                status: false,
                message: errorData.message || "Bad request",
            };
        }

        // ดึงข้อมูล JSON ที่ตอบกลับจาก API
        const result = await response.json();
        return {
            status: true,
            message: result.message || "Updated successful",
        };
    } catch (error) {
        // จัดการข้อผิดพลาดที่เกิดจาก fetch
        console.error("Error in UpdateBookActivity:", error);
        return {
            status: false,
            message: "Network error or server is unreachable",
        };
    }
}


async function DeleteBookActivityByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/bookactivitys/${id}`, requestOptions);
}


export { GetBookActivitys, GetBookActivityById, CreateBookActivity, UpdateBookActivity, DeleteBookActivityByID , GetAllBookActivityByCustomerId};