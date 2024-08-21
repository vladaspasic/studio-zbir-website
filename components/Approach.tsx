import type { Section } from 'zbir/sanity/sections';

export default function Approach({ section }: { section: Section }) {
    return (
        <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-xl mb-3">
                {section.title}
            </p>
            <p className="font-light">
                {section.description}
            </p>
        </div>
    );
}