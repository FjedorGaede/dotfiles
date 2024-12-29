-- Style diagnostic float
vim.diagnostic.config({
  float = {
    border = "rounded",
    style = "minimal",
    severity_sort = true,
  },
})

vim.keymap.set("n", "<leader>dh", vim.diagnostic.open_float, {
  desc = "[D]iagnostic in [H]over",
})

vim.api.nvim_set_keymap(
  "n",
  "]d",
  "<cmd>lua vim.diagnostic.goto_next()<CR>",
  { desc = "[D]iagnostics Next", noremap = true, silent = true }
)
vim.api.nvim_set_keymap(
  "n",
  "[d",
  "<cmd>lua vim.diagnostic.goto_prev()<CR>",
  { desc = "[D]iagnostics Pevious", noremap = true, silent = true }
)

-- Disable virtual text in insert mode and enable it in normal mode
vim.api.nvim_create_autocmd("InsertEnter", {
  callback = function()
    vim.diagnostic.config({ virtual_text = false }) -- Hide virtual text
  end,
})

vim.api.nvim_create_autocmd("InsertLeave", {
  callback = function()
    vim.diagnostic.config({ virtual_text = true }) -- Show virtual text
  end,
})

-- Enable diagnostics signs and also show error in insert mode
vim.diagnostic.config({
  signs = true, -- Enable signs for diagnostics
  update_in_insert = true, -- Ensure updates during insert mode
})

-- Set icons
local symbols = {
  Error = "󰅙",
  Warn = "",
  Hint = "󰌵",
  Info = "󰋼",
}

for name, icon in pairs(symbols) do
  local hl = "DiagnosticSign" .. name
  vim.fn.sign_define(hl, { text = icon, numhl = hl, texthl = hl })
end

return {
  {
    "folke/trouble.nvim",
    opts = {}, -- for default options, refer to the configuration section for custom setup.
    cmd = "Trouble",
    keys = {
      {
        "<leader>dp",
        "<cmd>Trouble diagnostics toggle<cr>",
        desc = "[D]iagnostics [P]roject",
      },
      {
        "<leader>db",
        "<cmd>Trouble diagnostics toggle filter.buf=0<cr>",
        desc = "[D]iagnostics [B]uffer",
      },
    },
  },
}
