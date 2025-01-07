local ls = require("luasnip")
local s = ls.snippet
local t = ls.text_node
local f = ls.function_node
local i = ls.insert_node
local l = require("luasnip.extras").lambda
local fmt = require("luasnip.extras.fmt").fmt

vim.keymap.set("n", "<leader><leader>s", "<cmd>source ~/.config/nvim/after/plugin/luasnip.lua<CR>")

ls.add_snippets("lua", {})

--- TYPESCRIPT SNIPPETS ---
local function camelToKebab(camelCaseStr)
  -- Replace uppercase letters with '-' followed by lowercase letters
  local kebabCaseStr = camelCaseStr:gsub("(%u)", function(c)
    return "-" .. c:lower()
  end)

  -- Remove leading hyphen if it exists
  if kebabCaseStr:sub(1, 1) == "-" then
    kebabCaseStr = kebabCaseStr:sub(2)
  end

  return kebabCaseStr
end

ls.add_snippets("typescript", {
  s(
    "descr",
    fmt(
      [[
  describe("{}", () => {{
    it("{}", () => {{
      {}
    }});
  }});
  ]],
      {
        i(1, "describe something"),
        i(2, "do something"),
        i(3),
      }
    )
  ),
  s(
    "angular_component",
    fmt(
      [[
  import {{ Component }} from '@angular/core';

  @Component({{
     selector: '{}',
     templateUrl: '{}',
     styleUrls: ['{}'],
   }})
   export class {}Component {{
     {}
   }}
  ]],
      {
        f(function(args)
          return "app-" .. camelToKebab(args[1][1])
        end, { 1 }),
        f(function(args)
          return "./" .. camelToKebab(args[1][1]) .. ".component.html"
        end, { 1 }),
        f(function(args)
          return "./" .. camelToKebab(args[1][1]) .. ".component.scss"
        end, { 1 }),
        i(1, "MyNamed"),
        i(0),
      }
    )
  ),
})
