-- TRAINING -- vaF, viF
function Outer()
  local a = 1
  function Inner()
    local b = "2"
  end
end

-- TRAINING -- vao, vio
if true then
  local a = 1
  if true then
    local b = "2"
  end
end

-- TRAINING -- vaO, viO
for i = 1, 10 do
  for j = 1, 10 do
    local a = 1
  end
end

return {
  "echasnovski/mini.ai",
  version = false,
  config = function()
    local ai = require("mini.ai")
    local spec_treesitter = ai.gen_spec.treesitter
    ai.setup({
      custom_textobjects = {
        F = spec_treesitter({ a = "@function.outer", i = "@function.inner" }),
        C = spec_treesitter({ a = "@comment.outer", i = "@comment.inner" }),
        o = spec_treesitter({
          a = { "@conditional.outer", "@loop.outer" },
          i = { "@conditional.inner", "@loop.inner" },
        }),
      },
    })
  end,
}

--- PLAYGROUND ---
--
-- [ { ( "aa", 'bb', `cc` ) } ] // vab, repeat ab, vaq, repeat aq
-- ( aa, bb, cc ), (aa), (cc, dd) // vi(,  repeat i( to jump to next
-- some space before f(aa, g(bb, cc)) // vif, vaf, cina, cila
-- 1aa_bb_cc1 dd // va_, di1, dib, da<space>
-- aaa.bbb.ccc.ddd // va.
--
--// vi(, and then il( or in( for going to last or next element
-- (
--   (aa), (bb), (cc)
-- ) (cc)
--
-- start always on *
--  |Key|     Name      |   Example line   |   a    |   i    |   2a   |   2i   |
--  |---|---------------|-1234567890123456-|--------|--------|--------|--------|
--  | ( |  Balanced ()  | (( *a (bb) ))    |        |        |        |        |
--  | [ |  Balanced []  | [[ *a [bb] ]]    | [2;12] | [4;10] | [1;13] | [2;12] |
--  | { |  Balanced {}  | {{ *a {bb} }}    |        |        |        |        |
--  | < |  Balanced <>  | << *a <bb> >>    |        |        |        |        |
--  |---|---------------|-1234567890123456-|--------|--------|--------|--------|
--  | ) |  Balanced ()  | (( *a (bb) ))    |        |        |        |        |
--  | ] |  Balanced []  | [[ *a [bb] ]]    |        |        |        |        |
--  | } |  Balanced {}  | {{ *a {bb} }}    | [2;12] | [3;11] | [1;13] | [2;12] |
--  | > |  Balanced <>  | << *a <bb> >>    |        |        |        |        |
--  | b |  Alias for    | [( *a {bb} )]    |        |        |        |        |
--  |   |  ), ], or }   |                  |        |        |        |        |
--  |---|---------------|-1234567890123456-|--------|--------|--------|--------|
--  | " |  Balanced "   | "*a" " bb "      |        |        |        |        |
--  | ' |  Balanced '   | '*a' ' bb '      |        |        |        |        |
--  | ` |  Balanced `   | `*a` ` bb `      | [1;4]  | [2;3]  | [6;11] | [7;10] |
--  | q |  Alias for    | '*a' " bb "      |        |        |        |        |
--  |   |  ", ', or `   |                  |        |        |        |        |
--  |---|---------------|-1234567890123456-|--------|--------|--------|--------|
--  | ? |  User prompt  | e*e o e o o      | [3;5]  | [4;4]  | [7;9]  | [8;8]  |
--  |   |(typed e and o)|                  |        |        |        |        |
--  |---|---------------|-1234567890123456-|--------|--------|--------|--------|
--  | t |      Tag      | <x><y>*a</y></x> | [4;12] | [7;8]  | [1;16] | [4;12] |
--  |---|---------------|-1234567890123456-|--------|--------|--------|--------|
--  | f | Function call | f(a, g(*b, c) )  | [6;13] | [8;12] | [1;15] | [3;14] |
--  |---|---------------|-1234567890123456-|--------|--------|--------|--------|
--  | a |   Argument    | f(*a, g(b, c) )  | [3;5]  | [3;4]  | [5;14] | [7;13] |
--  |---|---------------|-1234567890123456-|--------|--------|--------|--------|
--  |   |    Default    |                  |        |        |        |        |
--  |   |   (digits,    | aa_*b__cc___     | [4;7]  | [4;5]  | [8;12] | [8;9]  |
--  |   | punctuation,  | (example for _)  |        |        |        |        |
--  |   | or whitespace)|                  |        |        |        |        |
--  |---|---------------|-1234567890123456-|--------|--------|--------|--------|
-- --
