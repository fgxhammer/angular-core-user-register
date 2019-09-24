import { Injectable } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  readonly baseURI = "https://localhost:5001/api/ApplicationUser/Register";

  formModel = this.fb.group({
    UserName: ["", [Validators.required]],
    Email: ["", [Validators.email]],
    FullName: [""],
    Passwords: this.fb.group(
      {
        Password: ["", [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ["", Validators.required]
      },
      { validator: this.comparePasswords }
    )
  });

  comparePasswords(fb: FormGroup) {
    let confirmPwdCtrl = fb.get("ConfirmPassword");
    //passwordmismatch
    if (
      confirmPwdCtrl.errors == null ||
      "passwordMismatch" in confirmPwdCtrl.errors
    ) {
      if (fb.get("Password").value != confirmPwdCtrl.value)
        confirmPwdCtrl.setErrors({ passwordMismatch: true });
      else confirmPwdCtrl.setErrors({ passwordMismatch: true });
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.baseURI, body);
  }
}
