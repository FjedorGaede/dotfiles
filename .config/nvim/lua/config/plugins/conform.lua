return {
  {
    "stevearc/conform.nvim",
    config = function()
      require("conform").setup({
        log_level = vim.log.levels.DEBUG,
        formatters_by_ft = {
          lua = { "stylua", lsp_format = "fallback" },
          typescript = { "biome", "prettierd", "prettier", lsp_format = "fallback", stop_after_first = true },
        },
        format_on_save = {
          timeout_ms = 500,
          lsp_format = "fallback",
        },
      })
    end,
  },
}
