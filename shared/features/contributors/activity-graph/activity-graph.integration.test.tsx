import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { BiClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/bi-client-adapter";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { BiContributorActivityResponse } from "@/core/domain/bi/models/bi-contributor-activity-model";

describe("Activity Graph Integration Tests", () => {
  let biClientAdapter: BiClientAdapter;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient();
    biClientAdapter = new BiClientAdapter(httpClient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getBiContributorActivityById", () => {
    const contributorId = "test-contributor-id";

    it("should fetch activity data with default date range when no dates provided", async () => {
      // Arrange
      const mockResponse: BiContributorActivityResponse = {
        days: [
          {
            year: 2023,
            week: 1,
            day: 1,
            rewardCount: 1,
            codeReviewCount: 2,
            issueCount: 1,
            pullRequestCount: 3
          }
        ]
      };

      vi.spyOn(httpClient, 'request').mockResolvedValue(mockResponse);

      // Act
      const result = await biClientAdapter
        .getBiContributorActivityById({
          pathParams: { contributorId },
        })
        .request();

      // Assert
      expect(result).toBeDefined();
      expect(result.days).toHaveLength(1);
      expect(result.days[0].count).toBe(7); // 1 + 2 + 1 + 3
      expect(result.totalCount).toBe(7);
    });

    it("should fetch activity data within specified date range", async () => {
      // Arrange
      const fromDate = "2023-01-01T00:00:00Z";
      const toDate = "2023-12-31T23:59:59Z";
      
      const mockResponse: BiContributorActivityResponse = {
        days: [
          {
            year: 2023,
            week: 1,
            day: 1,
            rewardCount: 1,
            codeReviewCount: 2,
            issueCount: 1,
            pullRequestCount: 3
          },
          {
            year: 2023,
            week: 52,
            day: 7,
            rewardCount: 0,
            codeReviewCount: 1,
            issueCount: 2,
            pullRequestCount: 1
          }
        ]
      };

      vi.spyOn(httpClient, 'request').mockResolvedValue(mockResponse);

      // Act
      const result = await biClientAdapter
        .getBiContributorActivityById({
          pathParams: { contributorId },
          queryParams: { fromDate, toDate },
        })
        .request();

      // Assert
      expect(result).toBeDefined();
      expect(result.days).toHaveLength(2);
      expect(result.days[0].count).toBe(7); // 1 + 2 + 1 + 3
      expect(result.days[1].count).toBe(4); // 0 + 1 + 2 + 1
      expect(result.totalCount).toBe(11);
    });

    it("should handle invalid date formats gracefully", async () => {
      // Arrange
      const invalidFromDate = "invalid-date";
      const invalidToDate = "also-invalid";

      vi.spyOn(httpClient, 'request').mockRejectedValue(new Error("Invalid date format"));

      // Act & Assert
      await expect(
        biClientAdapter
          .getBiContributorActivityById({
            pathParams: { contributorId },
            queryParams: { fromDate: invalidFromDate, toDate: invalidToDate },
          })
          .request()
      ).rejects.toThrow("Invalid date format");
    });

    it("should handle partial date range (only fromDate)", async () => {
      // Arrange
      const fromDate = "2023-06-01T00:00:00Z";
      
      const mockResponse: BiContributorActivityResponse = {
        days: [
          {
            year: 2023,
            week: 22,
            day: 4,
            rewardCount: 1,
            codeReviewCount: 1,
            issueCount: 0,
            pullRequestCount: 2
          }
        ]
      };

      vi.spyOn(httpClient, 'request').mockResolvedValue(mockResponse);

      // Act
      const result = await biClientAdapter
        .getBiContributorActivityById({
          pathParams: { contributorId },
          queryParams: { fromDate },
        })
        .request();

      // Assert
      expect(result).toBeDefined();
      expect(result.days).toHaveLength(1);
      expect(result.days[0].count).toBe(4); // 1 + 1 + 0 + 2
      expect(result.totalCount).toBe(4);
    });

    it("should handle partial date range (only toDate)", async () => {
      // Arrange
      const toDate = "2023-12-31T23:59:59Z";
      
      const mockResponse: BiContributorActivityResponse = {
        days: [
          {
            year: 2023,
            week: 52,
            day: 7,
            rewardCount: 2,
            codeReviewCount: 1,
            issueCount: 1,
            pullRequestCount: 0
          }
        ]
      };

      vi.spyOn(httpClient, 'request').mockResolvedValue(mockResponse);

      // Act
      const result = await biClientAdapter
        .getBiContributorActivityById({
          pathParams: { contributorId },
          queryParams: { toDate },
        })
        .request();

      // Assert
      expect(result).toBeDefined();
      expect(result.days).toHaveLength(1);
      expect(result.days[0].count).toBe(4); // 2 + 1 + 1 + 0
      expect(result.totalCount).toBe(4);
    });
  });
});
