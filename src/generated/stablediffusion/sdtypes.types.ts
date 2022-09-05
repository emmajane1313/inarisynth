import { FormEvent } from "react"

export type UseEnterPromptResult = {prompt: any, handlePromptInput: (e: FormEvent<HTMLFormElement>) => void}