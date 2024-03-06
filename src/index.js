import './style.css'
import { Login } from './pages/login/login'
import { SignUp } from './pages/signup/signup'
import { LogOut } from './pages/logout/logout'
import { Main } from './pages/main/main'
import { WithNavbar } from './widgets/layout/withNavbar/withNavbar'

const body = document.getElementsByTagName('body')[0];

const page = new WithNavbar(body);
page.addPage(new Main(page, 'main'));
page.addPage(new Login(page, 'login'));
page.addPage(new SignUp(page, 'signup'));
page.addPage(new LogOut(page, 'logout'));
page.render();
