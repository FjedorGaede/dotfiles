--  --- CONFIGURATION OF LSPS --- --
-- You can just add your LSP here with an empty object or just use a opts table
--
---@type table<string, { }>
local SERVERS_TO_INSTALL = {
  lua_ls = {
    settings = { -- Finde settings and config information here https://github.com/LuaLS/lua-language-server/wiki/Configuration-File
      Lua = {
        diagnostics = {
          disable = { "trailing-space" },
        },
      },
    },
  },

  vtsls = {},

  angularls = {},
  cssmodules_ls = {},
  cssls = {},

  ["html-lsp"] = {},

  ["json-lsp"] = {},
  taplo = {},

  -- ["eslint-lsp"] = {},
  ["eslint"] = {
    bin = "eslint_d",
  },
}

local FORMATTERS_TO_INSTALL = {
  "stylua",
}

-- --- HELPERS --- --

-- See `:h mason-lspconfig.setup_handlers()`
---@return table<string, fun(server_name: string)>?
function GetHandlers()
  local handlers = {
    function(server_name)
      require("lspconfig")[server_name].setup({})
    end,
  }

  for server_name, settings in pairs(SERVERS_TO_INSTALL) do
    handlers[server_name] = function()
      local server = require("lspconfig")[server_name]
      settings.capabilities = require("blink.cmp").get_lsp_capabilities(settings.capabilities)
      server.setup(settings or {})
    end
  end

  return handlers
end

---@return table<string>
function GetEnsureInstalled()
  local tools = {}
  for server_name, _ in pairs(SERVERS_TO_INSTALL) do
    tools[#tools + 1] = server_name
  end

  for _, formatter_name in ipairs(FORMATTERS_TO_INSTALL) do
    tools[#tools + 1] = formatter_name
  end

  return tools
end

-- --- LSP PLUGINS CONFIGURATION --- --
return {
  { "neovim/nvim-lspconfig" },
  { "mason-org/mason-registry" },
  {
    "williamboman/mason.nvim",
    opts = {},
  },
  {
    "WhoIsSethDaniel/mason-tool-installer.nvim",
    opts = {
      ensure_installed = GetEnsureInstalled(),
    },
  },
  {
    "williamboman/mason-lspconfig.nvim",
    dependencies = { "mason.nvim", "saghen/blink.cmp", "mason-org/mason-registry" },
    opts = {
      handlers = GetHandlers(),
    },
  },
  {
    "KostkaBrukowa/definition-or-references.nvim",
    config = function()
      vim.keymap.set("n", "<C-LeftMouse>", function()
        -- Simulate click to place cursor on correct position
        vim.api.nvim_feedkeys(vim.api.nvim_replace_termcodes("<LeftMouse>", false, false, true), "in", false)

        -- defer to let nvim refresh to get correct position
        vim.defer_fn(function()
          require("definition-or-references").definition_or_references()
        end, 0)
      end)
    end,
  },
  {
    "windwp/nvim-ts-autotag",
    config = function()
      require("nvim-ts-autotag").setup({})
    end,
  },
}
