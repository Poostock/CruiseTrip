import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ActivityInterface } from "../../../interfaces/IActivity";

interface ActivityTableProps {
    activitys: ActivityInterface[];
    onEdit: (activity: ActivityInterface) => void;
    onDelete: (id: number, name: string) => void;
}

const ActivityTable: React.FC<ActivityTableProps> = ({ activitys, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="border-b p-4 text-sm font-semibold text-gray-700 w-1/12">
                            ID
                        </th>
                        <th className="border-b p-4 text-sm font-semibold text-gray-700 w-1/6">
                            Picture
                        </th>
                        <th className="border-b p-4 text-sm font-semibold text-gray-700 w-1/3">
                            Name
                        </th>
                        <th className="border-b p-4 text-sm font-semibold text-gray-700 w-1/4">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {activitys.map((activity, index) => (
                        <tr key={activity.ID} className="hover:bg-gray-50">
                            <td className="border-b p-4 text-center text-gray-600">
                                {index + 1}
                            </td>
                            <td className="border-b p-4">
                                {activity.ActivityImg ? (
                                    <img
                                        src={activity.ActivityImg}
                                        alt={activity.Name}
                                        className="w-16 h-16 object-cover rounded-md border border-gray-300"
                                    />
                                ) : (
                                    <span className="text-gray-500">No Image</span>
                                )}
                            </td>
                            <td className="border-b p-4 text-gray-700">{activity.Name}</td>
                            <td className="border-b p-4">
                                <div className="space-x-4 flex items-center">
                                    <button
                                        onClick={() => onEdit(activity)}
                                        className="text-green-500 hover:text-green-600"
                                    >
                                        <FiEdit className="w-6 h-auto" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            onDelete(
                                                activity.ID!,
                                                activity.Name ?? "Unnamed Activity"
                                            )
                                        }
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <RiDeleteBin6Line className="w-6 h-auto" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTable;
