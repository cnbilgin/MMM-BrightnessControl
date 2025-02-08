import { exec } from "child_process";

const GET_BRIGHTNESS_COMMAND = `ddcutil getvcp 10 | grep -Po "(?<=current value =)[ \\t]*\\K[0-9]+"`;
const SET_BRIGHTNESS_COMMAND = `ddcutil setvcp 10 {{value}}`;

export class Brightness {
  value: number = 0;

  constructor() {
    this.collectValue().then((value) => {
      this.value = value;
    });
  }

  getValue() {
    this.collectValue();

    return this.value;
  }

  async changeValue(value: number) {
    const newValue = Math.max(Math.min(value, 100), 0);

    const command = SET_BRIGHTNESS_COMMAND.replace(
      "{{value}}",
      newValue.toString()
    );

    await execPromise(command);
    this.value = newValue;
  }

  async changeValueBy(val: number) {
    await this.changeValue(this.value + val);
  }

  async collectValue() {
    const out = await execPromise(GET_BRIGHTNESS_COMMAND).catch((e) => {
      console.error(e);
      return 0;
    });

    return Number(out);
  }
}

const execPromise = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`exec error: ${error}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }

      resolve(stdout);
    });
  });
};
