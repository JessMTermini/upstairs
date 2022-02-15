import { useState } from "react";
import { gql } from "@apollo/client";

import BaseAuthentication, {
  BaseAuthenticationTextInput,
} from "~/layout/BaseAuthentication";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { forgotPasswordFormLinks } from "~/constants/links";

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestPasswordResetMutation($email: String!) {
    requestPasswordReset(email: $email) {
      email
    }
  }
`;

interface ForgotPasswordFields {
  email: string;
}
interface ForgotPasswordResponse {
  email: string;
}

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const onSuccess = (data: ForgotPasswordResponse) => {
    const { email } = data;

    console.log({ email });
  };

  return (
    <BaseAuthentication<ForgotPasswordFields, ForgotPasswordResponse>
      {...{ isSubmitting, setIsSubmitting, onSuccess }}
      title="Forgot Password?"
      submitButtonText="Request Password Reset"
      links={forgotPasswordFormLinks}
      data={{
        email,
      }}
      mutation={REQUEST_PASSWORD_RESET_MUTATION}
      setErrors={{
        email: setEmailError,
      }}
      fields={{
        email: {
          fieldName: "Email",
          isRequired: true,
        },
      }}
    >
      <BaseAuthenticationTextInput
        type="email"
        label="Email Address"
        name="email"
        error={emailError}
        disabled={isSubmitting}
        maxLength={INPUT_SETTINGS.email.maxLength}
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        isRequired
        autoFocus
      />
    </BaseAuthentication>
  );
}