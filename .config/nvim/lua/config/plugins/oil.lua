function Keymaps()
  -- Keymap to toggle Oil as a float
  vim.keymap.set("n", "<leader>-", function()
    require("oil").toggle_float()
  end, { desc = "Toggle [O]il float" })
end

return {
  {
    "stevearc/oil.nvim",
    enabled = false,
    ---@module 'oil'
    ---@type oil.SetupOpts
    opts = {
      default_file_explorer = true,
      view_options = {
        show_hidden = true,
      },
    },
    -- Optional dependencies
    dependencies = { { "echasnovski/mini.icons", opts = {} } },
    config = function(_, opts)
      require("oil").setup(opts)

      Keymaps()
    end,
  },
}
