import React from "react";

import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import {
  click,
  initializeReactContainer,
  render,
  element,
  elements,
  textOf,
  typesOf,
} from "./reactTestExtensions";

describe("Appointment", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  const appointmentTable = () => {
    element("#appointmentView > table");
  };

  it("renders a table", () => {
    render(<Appointment customer={blankCustomer} />);

    expect(appointmentTable()).not.toBeNull;
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);

    expect(document.body).toContainText("Ashley");
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);

    expect(document.body).toContainText("Jordan");
  });
});

describe("AppointmentsDayView", () => {
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

  const secondButton = () => elements("button")[1];

  it("render a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(element("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(element("ol")).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(elements("ol > li")).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(textOf(elements("li"))).toEqual(["12:00", "13:00"]);
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(document.body).toContainText("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(typesOf(elements("li > *"))).toEqual(["button", "button"]);
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    click(secondButton());

    expect(document.body).toContainText("Jordan");
  });

  // The author references the following two tests in the book (Chapter 3, page 72)
  // but failed to include any instructions to create them at any previous point.
  // Additionally, they failed to include the source code that these test are checking.
  // I had to go to the Github repo for the book to find the tests referenced and the source that they test.
  // Perhaps they'll show up later in the book?
  // edit: I'm beginning to think that the author expects the reader to start
  // each chapter using the code in Github rather than just the code that results
  // from following along with the book.
  it("adds toggled class to button when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    click(secondButton());
    expect(secondButton()).toHaveClass("toggled");
  });

  it("does not add toggled class if button is not selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(secondButton().className).not.toMatch("toggled");
    expect(secondButton()).not.toHaveClass("toggled");
  });
});
