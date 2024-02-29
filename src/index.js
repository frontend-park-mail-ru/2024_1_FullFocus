import { Login } from './pages/login/login'
import { SignUp } from './pages/signup/signup'
import { Profile } from './pages/profile/profile'
import { Main } from './pages/main/main'
import { WithNavbar } from './widgets/layout/withNavbar/withNavbar'

const root = document.getElementById('root');

const page = new WithNavbar(root);
page.addPage(new Main(page, 'main'));
page.addPage(new Login(page, 'login'));
page.addPage(new SignUp(page, 'signup'));
page.addPage(new Profile(page, 'profile'));
page.render();
