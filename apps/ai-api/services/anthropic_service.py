import anthropic

class Anthropic_Service:

  def __init__(self):
    self.client = anthropic.Anthropic()

  def query_to_vision(self, b64, media_type, user_alias):
    message = self.client.messages.create(
      model="claude-3-opus-20240229",
      max_tokens=1024,
      temperature=0,
      system="Analiza la imagen proporcionada y responde solo en formato JSON, evita cualquier texto fuera del JSON con el siguiente formato: {found: boolean, user_alias: string, minutes: number, seconds: number, milliseconds: number}",
      messages=[
        {
          "role": "user",
          "content": [
            {
              "type": "image",
              "source": {
                "type": "base64",
                "media_type": media_type,
                "data": b64,
              },
            },
            {
              "type": "text",
              "text": f"En la imagen proporcionada, los formatos de tiempo pueden estar en minutos:segundos.milisegundos o solo segundos.milisegundos, y los mejores tiempos están marcados. Por favor, encuentra y responde con el mejor tiempo de {user_alias}."
            }
          ],
        }
      ],
    )

    return message.content[0].text