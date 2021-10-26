import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string = 'folder/Inbox';
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private app: AppComponent
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            usernameOrEmail: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        this.app.appPages.splice(this.app.appPages.length - 1);
        this.app.appPages.push({ title: 'Login', url: '/login/', icon: 'person' });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.usernameOrEmail.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.app.appPages.splice(this.app.appPages.length - 1);
                    this.app.appPages.push({ title: 'Logout', url: '/login/', icon: 'person' });
                    if (this.authenticationService.role !== 'ROLE_ADMIN')
                    this.app.adminPages = null;
                    this.authenticationService.role == 'ROLE_ADMIN' ? this.router.navigate(['admin']) :
                        this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }


}
