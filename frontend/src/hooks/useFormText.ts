import { Dispatch, useState } from "react"

type TextInputType = HTMLTextAreaElement | HTMLInputElement;

interface useFormTextReturnObj {
  text: string,
  handleChangeText: <T extends TextInputType>(event: React.FormEvent<T>) => void,
  setText: Dispatch<React.SetStateAction<string>>
}

export const useFormText = (initialState: string, maxLength: number): useFormTextReturnObj => {
  const [text, setText] = useState<string>(initialState);

  const handleChangeText = <T extends TextInputType>(event: React.FormEvent<T>): void => {
    if (event.currentTarget && event.currentTarget.value.length <= maxLength){
      setText(event.currentTarget.value);
    }
  }

  return {text, handleChangeText, setText}
}