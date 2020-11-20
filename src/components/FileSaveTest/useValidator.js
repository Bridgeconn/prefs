// import { useState } from "react"

// export default function useValidation({ key }) {
//     const [ validationError, SetValidatoinError] = useState(false)
//     const [ validationMessage, SetValidatoinMessage] = useState(false)

//     const keyExists = () => {
//         if (localStorage.getItem(key) !== null) {
//             SetValidatoinError(true)
//             SetValidatoinMessage("Same Key exists")
//         }
//         else {
//             SetValidatoinError(false)
//             SetValidatoinMessage("Sucessfully created")
//         }
//     }
// 	return { validationError, validationMessage, keyExists };
// }