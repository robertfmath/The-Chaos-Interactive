import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PoemDataSkeleton from "../../components/PoemDataSkeleton";

describe("PoemDataSkeleton", () => {
  beforeEach(() => {
    render(<PoemDataSkeleton />);
  });

  it("renders the skeleton container", () => {
    const skeletonContainer = screen.getByTestId("poem-data-skeleton");
    expect(skeletonContainer).toBeInTheDocument();
  });

  it("renders the correct number of Skeleton components", () => {
    const skeletons = screen.getAllByTestId("line-data-skeleton");
    expect(skeletons).toHaveLength(20);
  });
});
