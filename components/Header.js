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
    {
        name: 'API',
        href: '/api',
    },
];

const Header = () => {
    return (
        <header className="bg-gray-800 px-2.5 py-3">
            <nav className="mx-auto flex max-w-screen-xl items-center gap-3 md:gap-10">
                <Link href={'/'} className="mr-auto">
                    <img src="https://gssoc.girlscript.tech/GS_logo_White.svg" className="h-6 md:h-8" />
                </Link>
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className=" text-sm font-medium transition hover:text-primary-500 hover:underline md:text-lg"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
