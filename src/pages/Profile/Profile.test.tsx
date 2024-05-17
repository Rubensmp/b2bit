import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from ".";
import api from "../../services/config";

jest.mock("../../services/config", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        name: "Test User",
        avatar: "test-avatar.jpg",
        email: "test@example.com",
      },
    })
  ),
}));

describe("Profile Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders profile correctly", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Profile picture")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByAltText("profileImage")).toBeInTheDocument();
    });

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText("Test User")).toBeInTheDocument();
      }, 1000);
    });
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText("test@example.com")).toBeInTheDocument();
      }, 1000);
    });
  });

  test("handles logout correctly", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(localStorage.getItem("accessToken")).toBeNull();
    });

    await waitFor(() => {
      expect(localStorage.getItem("refreshToken")).toBeNull();
    });
  });

  test("displays loading indicator while fetching user info", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loadingId")).toBeInTheDocument();

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/auth/profile/", {
        headers: {
          Accept: "application/json;version=v1_web",
          "Content-Type": "application/json",
        },
      });
    });
  });
});
