import { useToast } from "./use-toast"
import { useState } from "react";
import { UserRegistrationSchema, UserRegistrationProps } from "@/schemas/auth.schema";
import { onCompleteUserRegistration } from "@/actions/auth";

export const useSignUpForm = () => {
  const {toast} = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const {signup, isLoaded, setActive} = useSignup()
  const router = useRouter()
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: 'owner'
    }, 
    mode: 'onChange',
  })

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return

    try {
        setLoading(true)
        const registered = await onCompleteUserRegistration(
          values.fullname,
          values.type
        )
      }
    }
  )
}
