import React, { useState } from 'react';
import ReactDOM from 'react-dom'

function AddNewEmployeeModal({ closeModal }) {
    const [employeeData, setEmployeeData] = useState({
        employeeId: '',
        employeeName: '',
        employeeStatus: '',
        joiningDate: '',
        birthDate: '',
        skills: '',
        salary: '',
        address: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(employeeData)

        // Perform form submission or data handling here
        // Close the modal after form submission
    };

    return ReactDOM.createPortal(
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50'>

            <div className="bg-white fixed top-[10%]  left-[30%] border-black rounded-md w-[50%] overflow-y-scroll ">
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="flex">
                            <div className="w-1/2 pr-2">
                                <label className="block mb-2 font-bold" htmlFor="employeeId">
                                    Employee ID
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    id="employeeId"
                                    name="employeeId"
                                    value={employeeData.employeeId}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block mb-2 font-bold" htmlFor="employeeName">
                                    Employee Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    id="employeeName"
                                    name="employeeName"
                                    value={employeeData.employeeName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <div className="w-1/2 pr-2">
                                <label className="block mb-2 font-bold" htmlFor="employeeStatus">
                                    Employee Status
                                </label>
                                <select
                                    className="w-full px-3 py-2 border rounded"
                                    id="employeeStatus"
                                    name="employeeStatus"
                                    value={employeeData.employeeStatus}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="leave">On Leave</option>
                                </select>
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block mb-2 font-bold" htmlFor="joiningDate">
                                    Joining Date
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="date"
                                    id="joiningDate"
                                    name="joiningDate"
                                    value={employeeData.joiningDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <div className="w-1/2 pr-2">
                                <label className="block mb-2 font-bold" htmlFor="birthDate">
                                    Birth Date
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={employeeData.birthDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block mb-2 font-bold" htmlFor="skills">
                                    Skills
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded"
                                    id="skills"
                                    name="skills"
                                    value={employeeData.skills}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <div className="w-1/2 pr-2">
                                <label className="block mb-2 font-bold" htmlFor="salary">
                                    Salary
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="number"
                                    id="salary"
                                    name="salary"
                                    value={employeeData.salary}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block mb-2 font-bold" htmlFor="address">
                                    Address
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded"
                                    id="address"
                                    name="address"
                                    value={employeeData.address}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                            type="button"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>, document.getElementById('portal')
    );
}

export default AddNewEmployeeModal;
