import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

beforeEach(() => {
  //arrange
  render(<IletisimFormu />);
});
test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("iletişim formu headerı render ediliyor", () => {
  //act
  const heading = screen.getByRole("heading", { level: 1 });
  //assert
  expect(heading).toBeInTheDocument();
  expect(heading).toBeTruthy();
  expect(heading).toHaveTextContent("İletişim Formu");
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  //act
  const firstName = screen.getByLabelText("Ad*");
  userEvent.type(firstName, "abcd");
  const errorMessages = await screen.findAllByTestId("error");
  //assert
  expect(errorMessages).toHaveLength(1);
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  //act
  const button = screen.getByRole("button");
  userEvent.click(button);
  const errorMessages = await screen.findAllByTestId("error");
  //assert
  expect(errorMessages).toHaveLength(3);
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  //act

  const firstName = screen.getByLabelText("Ad*");
  const lastName = screen.getByLabelText("Soyad*");
  const button = screen.getByRole("button");

  userEvent.type(firstName, "abcde");
  userEvent.type(lastName, "efghj");

  userEvent.click(button);

  const errorMessages = await screen.findAllByTestId("error");

  //assert
  expect(errorMessages).toHaveLength(1);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});
