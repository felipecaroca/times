import anthropic

class Anthropic_Service:

  def __init__(self):
    self.client = anthropic.Anthropic()

  def query_to_vision(self, b64, media_type, user_alias):
    message = self.client.messages.create(
      model="claude-3-opus-20240229",
      max_tokens=1024,
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
              "text": f"Analiza con atención la imagen, los mejores tiempos estan marcados, los formatos de tiempo pueden estar en minutos:segundos.milisegundos o solo segundos.milisegundos, responde solo en json el mejor tiempo de {user_alias}"+" responde en el siguiente formato: {user_alias: string, minutes: number, second: number, millisecond: number}"
            }
          ],
        }
      ],
    )

    return message.content[0].text