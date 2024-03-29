import './style.scss';
import { Login } from '@/pages/login';
import { SignUp } from '@/pages/signup';
import { LogOut } from '@/pages/logout';
import { Main } from '@/pages/main';
import { WithNavbar } from '@/widgets/layout';

const root = document.getElementsByClassName('root')[0];

const page = new WithNavbar(root);
page.render();
page.addPage(new Main(page, 'main'), 'main');
page.addPage(new Login(page, 'login'), 'login');
page.addPage(new SignUp(page, 'signup'), 'signup');
page.addPage(new LogOut(page, 'logout'), 'logout');
page.goToPage('login');
