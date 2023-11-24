import { useCallback, useState } from "react"

type UseActionOptions<TOutput> = {
  onSuccess?: (data: TOutput) => void
  onError?: (error: string) => void
}

type Result<TData> = {
  ok: boolean
  data: TData
  errors: any
  message: string
}

type Action<TInput, TOutput> = (data: TInput) => Promise<Result<TOutput>>

export let useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput>,
) => {
  let [loading, setLoading] = useState(false)
  let [data, setData] = useState<TOutput | null>(null)
  let [errors, setErrors] = useState<string | null>(null)

  let call = useCallback(
    async (input: TInput) => {
      setLoading(true)

      try {
        let result = await action(input)

        if (!result) {
          return
        }

        if (result.ok) {
          setData(result.data)
          options.onSuccess?.(result.data)
        }

        if (!result.ok) {
          setErrors(result.errors)
          options.onError?.(result.errors)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    },
    [action, options],
  )

  return {
    call,
    data,
    loading,
    errors,
  }
}
