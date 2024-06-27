// import { InputFieldProps } from "@src/types/auth/auth";
// import React from "react";

// export const InputField: React.FC<InputFieldProps> = ({
//   type,
//   id,
//   label,
//   register,
//   rules,
//   errors,
//   placeholder,
// }) => {
//   const errorMessage = errors?.[id]?.message;
//   const hasError = !!errorMessage;

//   return (
//     <div className="form-group">
//       <label htmlFor={id}>{label}</label>
//       <div className="input-wrapper">
//         <input
//           type={type}
//           id={id}
//           placeholder={placeholder}
//           aria-invalid={hasError}
//           {...(register && register(id, rules))}
//         />
//         {hasError && <span className="error">{errorMessage}</span>}
//       </div>
//     </div>
//   );
// };

// export default InputField;
