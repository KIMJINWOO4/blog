import { SVGProps } from 'react';
import GithubIcon from '../icons/GithubIcon';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import MailIcon from '../icons/MailIcon';
import TagIcon from '../icons/TagIcon';
import VelogIcon from '../icons/VelogIcon';
import YoutubeIcon from '../icons/YoutubeIcon';

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

// icons 객체에 대한 인덱스 시그니처 추가
const icons: { [key: string]: IconComponent } = {
    email: MailIcon,
    github: GithubIcon,
    instagram: InstagramIcon,
    velog: VelogIcon,
    linkedin: LinkedinIcon,
    youtube: YoutubeIcon,
};

export default function ContactsIcon({ contact, ...props }: React.ComponentProps<'svg'> & { contact: string }) {
    const Component = icons[contact] ?? TagIcon;

    return <Component {...props} />;
}
