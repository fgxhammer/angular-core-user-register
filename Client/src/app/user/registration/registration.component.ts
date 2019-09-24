import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/user.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styles: []
})
export class RegistrationComponent implements OnInit {
  constructor(public service: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeded) {
          this.service.formModel.reset();
        } else {
          res.errors.foreach(e => {
            switch (e.code) {
              case "DublicateUserName":
                // Username is already taken
                break;
              default:
                // Registration failed
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
