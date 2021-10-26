import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username;
  area;
  public appPages = [
    { title: 'Asistencias', url: '/asistencias/', icon: 'calendar' },
    //{ title: 'Prox', url: '/folder/Outbox', icon: 'paper-plane' },
    //{ title: 'Prox', url: '/folder/Favorites', icon: 'heart' },
    //{ title: 'Prox', url: '/folder/Archived', icon: 'archive' },
    //{ title: 'Prox', url: '/folder/Trash', icon: 'trash' },
    //{ title: 'Colaboradores', url: '/colaboradores/', icon: 'person' },
    //{ title: 'Login', url: '/login/', icon: 'person' },
  ];
  public adminPages = [
    { title: 'Admin - Áreas', url: '/admin/areas', icon: 'paper-plane' },
    { title: 'Admin - Colaboradores', url: '/admin/colaboradores', icon: 'person' },
    { title: 'Admin - Asistencias', url: '/admin/asistencias', icon: 'calendar' },
    { title: 'Admin - Usuarios', url: '/admin/usuarios', icon: 'person' },
    { title: 'Admin - Tipo Asistencia', url: '/admin/tipo-asistencias', icon: 'paper-plane' },
    { title: 'Admin - Feriados', url: '/admin/feriados', icon: 'paper-plane' },
  ];
  constructor(private authService: AuthService) {
    if (!authService.loggedIn)
      this.appPages.push({ title: 'Login', url: '/login/', icon: 'person' })
    else {
      this.appPages.push({ title: 'Logout', url: '/login/', icon: 'person' })
      if (this.authService.user)
        this.username = this.authService.user.username
    }

    if (localStorage.getItem('role') !== "ROLE_ADMIN")
    this.adminPages = null;



  }
}
