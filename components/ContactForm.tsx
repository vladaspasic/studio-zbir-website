'use client'

import { useId, ComponentType, HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';
import classnames from 'classnames';
import { LuCheckCircle, LuSend } from 'react-icons/lu';
import { useForm } from '@formspree/react';
import Button from 'zbir/components/Button';

export type FormControlProps<T> = {
    input: ComponentType<{ placeholder: string } & HTMLAttributes<T>>,
    label: string,
} & InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;

function FormControl({ input: Input, label, className, ...props }: FormControlProps<HTMLElement>) {
    const id = 'form-control-' + useId() + '-' + props.name;

    return (
        <div className={classnames('relative z-0', className)}>
            <Input {...props}
                   id={id}
                   placeholder=" "
                   className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-0"
            />
            <label htmlFor={id}
                   className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black"
            >
                {label}
            </label>
        </div>
    );
}

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input {...props} />
    );
}

function TextArea(props: InputHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea {...props} />
    );
}

export default function ContactForm() {
    const t = useTranslations();
    const [state, handleSubmit] = useForm(String(process.env.NEXT_PUBLIC_FORM_SPREE_ID));

    if (state.succeeded) {
        return (
            <div className="text-center self-center">
                <LuCheckCircle size="6rem" className="mx-auto p-6 rounded-full bg-green-100 text-green-400"/>
                <p className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                    {t('contact.form.success.title')}
                </p>
                <div className="text-gray-900" dangerouslySetInnerHTML={{
                    __html: t.markup('contact.form.success.message', {
                        paragraph: (chunks) => `<p class="mb-2">${chunks}</p>`
                    }),
                }} />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 tablet:grid-cols-2">
                <FormControl
                    type="text"
                    name="name"
                    label={t('contact.form.name')}
                    input={Input}
                />

                <FormControl
                    type="email"
                    name="email"
                    label={t('contact.form.email')}
                    input={Input}
                />

                <FormControl
                    name="message"
                    rows={6}
                    label={t('contact.form.message')}
                    input={TextArea}
                    className="col-span-2"
                />
            </div>

            <Button type="submit" disabled={state.submitting}>
                <span className="mr-2">
                    {t('contact.form.submit')}
                </span>
                <LuSend size="1.25rem"/>
            </Button>
        </form>
    );
}