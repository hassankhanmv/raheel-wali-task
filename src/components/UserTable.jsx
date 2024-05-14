import React, { useEffect } from "react";

const UserTable = ({ userData, phoneBrands, skills, onEdit, onRemove }) => {
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const getPhoneBrandLabel = (brandId) => {
    const brand = phoneBrands?.find((item) => item?.band_id === brandId);
    return brand ? brand.band : "";
  };

  const getSkillsLabels = (skillsIds) => {
    const skillLabels = skillsIds?.map((skillId) => {
      const skill = skills?.find((item) => item?.skill_id === skillId);
      return skill ? skill?.skill : "";
    });
    return skillLabels?.join(", ");
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left text-gray-600 font-medium">
              Email
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-medium">
              Phone
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-medium">
              Gender
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-medium">
              Phone Brand
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-medium">
              Skills
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.map((user) => (
              <tr key={user?.user_id} className="border-b">
                <td className="py-2 px-4">{user?.email}</td>
                <td className="py-2 px-4">{user?.phone}</td>
                <td className="py-2 px-4">{user?.gender}</td>
                <td className="py-2 px-4">
                  {getPhoneBrandLabel(user?.phone_brand)}
                </td>
                <td className="py-2 px-4">{getSkillsLabels(user?.skills)}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => onEdit(user.user_id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemove(user.user_id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
