import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

const UserForm = ({
  onSubmit,
  phoneBrands,
  skills,
  initialValues,
  isEditing,
  onCancelEdit,
}) => {
  useEffect(() => {
    console.log(initialValues, "initialValues");
  }, [initialValues]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required")
      .max(80, "Email cannot exceed 80 characters"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .required("Phone is required"),
    phone_brand: Yup.string().required("Phone brand is required"),
    skills: Yup.array().test(
      "one-skill",
      "Only one skill is required",
      (skills) => skills.length === 1
    ),
    gender: Yup.string().required("Gender is required"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    await onSubmit(values);
    resetForm({ initialValues: { ...initialValues } });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        initialValues || {
          user_id: uuidv4(),
          email: "",
          phone: "",
          phone_brand: "",
          skills: [],
          gender: "",
        }
      }
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="flex flex-wrap -mx-4 mb-4">
            <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>

            <div className="w-full md:w-1/2 px-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                placeholder="Enter your phone"
                className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="phone_brand"
            >
              Phone Brand
            </label>
            <Field
              as="select"
              name="phone_brand"
              className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Phone Brand</option>
              {phoneBrands.map((brand) => (
                <option key={brand.band_id} value={brand.band_id}>
                  {brand.band}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="phone_brand"
              component="div"
              className="text-red-500 text-xs italic mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Skills
            </label>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <label
                  key={skill.skill_id}
                  className="flex items-center space-x-2"
                >
                  <Field
                    type="checkbox"
                    name="skills"
                    value={skill.skill_id}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">{skill.skill}</span>
                </label>
              ))}
            </div>
            <ErrorMessage
              name="skills"
              component="div"
              className="text-red-500 text-xs italic mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Gender
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="gender"
                  value="male"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="gender"
                  value="female"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500 text-xs italic mt-1"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isEditing ? "Update User" : "Add New User"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
