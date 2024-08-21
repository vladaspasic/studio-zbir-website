import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { LuPhone, LuMail, LuSend } from 'react-icons/lu';
import Hero from 'zbir/components/Hero';
import Section from 'zbir/components/Section';
import { SocialLinks } from 'zbir/components/Layout';
import React from "react";

const TextInput = ({ type, name }: { type: string, name: string }) => (
    <input id={name}
           type={type}
           name={name}
           className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-0"
           placeholder=" "
    />
);

const TextareaInput = ({ name, rows = 5 }: { name: string, rows?: number }) => (
    <textarea id={name}
              name={name}
              rows={rows}
              className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-0"
              placeholder=" "
    ></textarea>
);

const Label = ({htmlFor, label}: { htmlFor: string, label: string }) => (
    <label
        htmlFor={htmlFor}
        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black">
        {label}
    </label>
);

export default function Contact({params}: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale);

    const t = useTranslations();

    return (
        <div>
            <Hero title={t('pages.contact')} subtitle={t('contact.subtitle')}/>

            <Section className="grid gap-10 tablet:grid-cols-2">
                <aside>
                    <p className="text-gray-800">
                        {t('contact.cta')}
                    </p>
                    <p className="flex items-center mt-8 mb-3">
                        <LuPhone size="1.5rem"/>
                        <a href="tel:+381062222222" className="ml-3 font-light font-xl hover:underline">
                            +381062222222
                        </a>
                    </p>
                    <p className="flex items-center mb-8">
                        <LuMail size="1.5rem"/>
                        <a href="mailto:contact@zbir.studio" className="ml-3 font-light font-xl hover:underline">
                            contact@zbir.studio
                        </a>
                    </p>

                    <p className="text-gray-800">
                        {t('contact.social.lead')}
                    </p>

                    <SocialLinks className="mt-6"/>
                </aside>
                <form>
                    <div className="grid gap-6 mb-6 tablet:grid-cols-2">
                        <div className="relative z-0">
                        <TextInput type="text" name="name"/>
                            <Label htmlFor="name" label={t('contact.form.name')}/>
                        </div>
                        <div className="relative z-0">
                            <TextInput type="email" name="mail"/>
                            <Label htmlFor="mail" label={t('contact.form.email')} />
                        </div>
                        <div className="relative z-0 col-span-2">
                            <TextareaInput name="message"/>
                            <Label htmlFor="message" label={t('contact.form.message')} />
                        </div>
                    </div>

                    <button type="submit"
                            className="inline-flex items-center justify-center px-4 py-2 text-gray-700 bg-white border rounded border-gray-400 duration-200 hover:bg-black hover:border-black hover:text-white">
                        <span className="mr-2">
                            {t('contact.form.submit')}
                        </span>
                        <LuSend size="1.25rem"/>
                    </button>
                </form>
            </Section>

            <Section>

            </Section>
        </div>
    );
}
