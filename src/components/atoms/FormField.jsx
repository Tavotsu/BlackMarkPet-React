import React from 'react';

const FormField = ({ id, label, type = 'text', value, onChange, required = false, isTextArea = false }) => {
  const commonClasses = "w-full p-3 bg-neutral-700 border border-neutral-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-standard";

  return (
    <div>
      <label htmlFor={id} className="block text-white text-sm font-bold mb-2">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className={`${commonClasses} h-32 resize-none`}
          rows="4"
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className={commonClasses}
        />
      )}
    </div>
  );
};

export default FormField;