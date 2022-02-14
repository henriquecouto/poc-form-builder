import { IMaskMixin } from "react-imask";
import { Controller, useForm } from "react-hook-form";
import { FormSchema } from "../../types/form-schema";
import { Fragment } from "react";

type ReactHookFormBuilderProps = {
  formSchema: FormSchema;
  formId: string;
  onSubmit: (data: any) => void;
};

const errors: {
  [key: string]: any;
} = {
  maxLength: "Max length exceeded",
  required: "This is required",
  validate: "Insert a valid value",
};

export const useFormBuilder = ({
  formSchema,
  formId,
  onSubmit,
}: ReactHookFormBuilderProps) => {
  const { handleSubmit, control, formState } = useForm({
    mode: "onBlur",
    defaultValues: formSchema.reduce(
      (previous, current) => ({
        ...previous,
        [current.name]: "",
      }),
      {}
    ) as any,
  });

  const Form = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id={formId}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {formSchema.map(({ rules, ...input }) => (
        <Fragment key={input.name}>
          <Controller
            name={input.name}
            control={control}
            rules={rules}
            render={({ field }) =>
              inputByType[input.type] ? (
                inputByType[input.type]({ ...input, ...field })
              ) : (
                <inputByType.default {...input} {...field} />
              )
            }
          />
          <span>{errors[formState.errors[input.name]?.type]}</span>
        </Fragment>
      ))}
    </form>
  );

  return { Form, formState };
};

const inputByType: { [x: string]: any } = {
  select: ({ options, ...props }: any) => {
    return (
      <select {...props}>
        <option disabled value="">
          {props.placeholder}
        </option>
        {options?.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  },
  default: IMaskMixin(({ inputRef, ...props }) => (
    <input {...props} ref={inputRef} />
  )),
};
