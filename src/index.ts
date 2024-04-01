import './style.scss';
import { App } from './app';

const root = document.getElementsByClassName('root')[0];

const app = new App(root);
app.render();
