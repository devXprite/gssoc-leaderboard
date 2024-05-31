import Link from 'next/link';

const links = [
    {
        name: 'Leaderboard',
        href: '/',
    },
    {
        name: 'Projects',
        href: '/projects',
    },
];

const Header = () => {
    return (
        <header className="bg-gray-800 px-2.5 py-3">
            <nav className="mx-auto flex max-w-screen-xl gap-3 md:gap-10 items-center">
                <Link href={'/'} className="mr-auto">
                    <img src="https://gssoc.girlscript.tech/GS_logo_White.svg" className="h-6 md:h-8" />
                </Link>
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className=" font-medium transition hover:text-primary-500 hover:underline text-sm md:text-lg"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
