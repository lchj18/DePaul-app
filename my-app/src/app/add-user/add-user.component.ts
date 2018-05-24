import {Component, OnInit} from '@angular/core';
import {DataService} from "../Data.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../../models/User";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {


   userCollection: User[];

   registration: FormGroup;
   user: User = new User();
   userExists: boolean = false;
   wasSubmitted: boolean = false;

  constructor(private service: DataService) { }

  /**
   * Gets all the students and users first to prevent adding existing users or students.
   */
  ngOnInit() {
    this.getUsers();

    this.registration = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required),
      depaulID: new FormControl('', Validators.pattern('^[1-9]\d{0,2}$')),
      userID: new FormControl('', Validators.required),
      degree: new FormControl('')
    });
  }

  /**
   *
   * @param {FormGroup} form
   */
  create(form: FormGroup) {
    if (form == null) return;
    this.user = form.value;
    let randID = <HTMLInputElement> document.getElementById('IDgenerator');
    if(randID != null) {
      this.user.depaulID = Number(randID.value);
    }
    for(let i = 0; i < this.userCollection.length; i++) {
      if(this.userCollection[i].firstName ===  this.user.firstName &&
      this.userCollection[i].lastName === this.user.lastName &&
      this.userCollection[i].address === this.user.address) {
        console.log('User exists.');
        this.userExists = true;
        return;
      }
    }
    this.service.addUser(this.user).subscribe( (user: User) => {
      console.log('User registered.');
      this.wasSubmitted = true;
      return;
    });
  }

  /**
   * Generates a random ID.
   */
  generateID() {
    let digits = Math.floor(Math.random() * 90000) + 1000000;
    let result = <HTMLInputElement> document.getElementById('IDgenerator');
    result.value = String(digits);
  }

  /**
   * Reset the form.
   */
  resetForm() {
    this.registration.reset();
    location.reload();
    this.wasSubmitted = false;
    this.userExists = false;
  }

  /**
   * Get all the users.
   */
  getUsers() {
    this.service.getUsers().subscribe(x => {
      this.userCollection = x;
      console.log(this.userCollection);
    })
  }
}
