import { useState } from "react";
import { useValidation } from './useValidation'
import { validations } from './useValidation'


export const useInput = (initialValue:string, validations:validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const onClean = () => {
        setValue('');
        setDirty(false);
    }

    const onChangeArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value)
    }

    const onBlure = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDirty(true)
    }
    const onBlureArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDirty(true)
    }

    return {
        value,
        onClean,
        onChange,
        onBlure,
        onChangeArea,
        onBlureArea,
        isDirty,
        ...valid
    }
    
}
