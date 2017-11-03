export default class MyStudent{
  name  : string;
  email : string;

 constructor(x:string,y:string){
   name=x;
   email = y;
 }

  getName() : string{
   return this.name;
 }

 getEmail():string{
   return this.email;
 }

 setName(input:string):void{
   this.name = input;
 }

 setEmail(input:string):void{
   this.email = input;
 }
}
