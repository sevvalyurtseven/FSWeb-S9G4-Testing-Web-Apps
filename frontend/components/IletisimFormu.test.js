import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

beforeEach(() => {
  //arrange
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
  //kullanıcı adı alanını seç
  //kullanıcı adı alanına 4 karakter gir
  //ekrandan hata mesajlarını ara
  //hata mesajının 1 tane oldugunu doğrula

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

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  //act
  const email = screen.getByLabelText("Email*");
  userEvent.type(email, "test");
  const errorMessage = await screen.findByTestId("error");
  //assert
  expect(errorMessage).toHaveTextContent(
    "email geçerli bir email adresi olmalıdır."
  );
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  //act
  const button = screen.getByRole("button");
  userEvent.click(button);
  const errorMessage = await screen.findByText(/soyad gereklidir./i);
  //assert
  expect(errorMessage).toBeInTheDocument();
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  //ilgili alanları bul

  const firstName = screen.getByLabelText("Ad*");
  const lastName = screen.getByLabelText("Soyad*");
  const email = screen.getByLabelText("Email*");

  //ilgili alanları dogru doldur

  userEvent.type(firstName, "abcde");
  userEvent.type(lastName, "efghj");
  userEvent.type(email, "test@test.com");

  //butona tıkla

  const button = screen.getByRole("button");
  userEvent.click(button);

  //render edilen hatayı ara
  await waitFor(() => {
    const errorMessages = screen.queryAllByTestId("error");
    //hata mesajlarının 0 tane oldugunu dogrula
    expect(errorMessages).toHaveLength(0);
  });
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});
