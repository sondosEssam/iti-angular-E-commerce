import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./components/nav-bar/nav-bar";
import { Footer } from "./components/footer/footer";
import { ToastContainerComponent } from "./components/toast/toast.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Http } from './services/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Footer, ToastContainerComponent, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('E-commerce');
}
