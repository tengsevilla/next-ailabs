import { CardAnimated, TCardItem } from "../ui/card-animated";

const aboutItems: TCardItem[] = [
    {
        description:
            "We're here to make technology feel less like a headache and more like a helping hand. Our goal is to create simple, smart solutions that actually make everyday life a little easier.",
        name: "About Us",
        title: "",
        src: "/aboutus.jpg",
    },
    {
        description:
            "Specializes in lead generation through LinkedIn Sales Navigator and automation tools like Expandi.io and HeyReach.io. An experienced Virtual Assistant in real estate and paralegal support.",
        name: "Blas",
        title: "Lead Gen Expert",
        src: "/blas.jpg",
    },
    {
        description:
            "A Data Engineer focused on Master Data Management, with additional experience in full-stack development.",
        name: "Anthony",
        title: "Developer",
        src: "/anthony.jpeg",
    },
];

export const About: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section className="text-white" id={id}>
            {/* Ensure CardAnimated does not use non-deterministic values during SSR */}
            <CardAnimated items={aboutItems} />
        </section>
    )
}