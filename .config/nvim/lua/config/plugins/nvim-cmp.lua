-- Define colors
-- vim.api.nvim_set_hl(0, "CmpCursorLine", { bg = "#BD93F9", fg = "white" })
--
return {}

-- return {
--   {
--     "hrsh7th/cmp-nvim-lsp",
--     enabled = false,
--   },
--   {
--     "L3MON4D3/LuaSnip",
--     dependencies = {
--       "saadparwaiz1/cmp_luasnip", -- This is used to register LuaSnip to the nvim-cmp plugin
--       "rafamadriz/friendly-snippets", -- A collection of snippets that are provided in a repository
--     },
--     enabled = false,
--   },
--   {
--     "hrsh7th/nvim-cmp",
--     enabled = false,
--     config = function()
--       local cmp = require("cmp")
--       require("luasnip.loaders.from_vscode").lazy_load() -- See this: https://github.com/rafamadriz/friendly-snippets?tab=readme-ov-file#with-lazynvim
--
--       cmp.setup({
--         snippet = {
--           expand = function(args)
--             require("luasnip").lsp_expand(args.body)
--           end,
--         },
--         window = {
--           completion = cmp.config.window.bordered({
--             winhighlight = "CursorLine:CmpCursorLine", -- This stlye the cursor line inside of the completion menu
--           }),
--           documentation = cmp.config.window.bordered(),
--         },
--         mapping = cmp.mapping.preset.insert({
--           ["<C-d>"] = cmp.mapping.scroll_docs(-4),
--           ["<C-u>"] = cmp.mapping.scroll_docs(4),
--           ["<C-Space>"] = cmp.mapping.complete(),
--           ["<C-e>"] = cmp.mapping.abort(),
--           ["<CR>"] = cmp.mapping.confirm({ select = true }),
--         }),
--         sources = cmp.config.sources({
--           { name = "nvim_lsp" },
--           { name = "luasnip" }, -- For luasnip users.
--           { name = "buffer" }, -- NOTE This is annoying as it pops up all the time I
--           { name = "path" },
--         }),
--       })
--     end,
--   },
-- }
